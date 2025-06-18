import db from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userWithCart = await db.user.findUnique({
      where: { id: user.id },
      include: {
        cart: {
          include: {
            cartItems: {
              include: {
                product: {
                  include: {
                    images: true, // 👈 includes images
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!userWithCart) {
      return NextResponse.json({});
    }

    return NextResponse.json(userWithCart);
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const email = user.primaryEmailAddress?.emailAddress;

    if (!email) {
      return new Response(JSON.stringify({ message: "Email not found" }), {
        status: 400,
      });
    }

    let dbUser = await db.user.findUnique({
      where: { email },
    });

    if (!dbUser) {
      dbUser = await db.user.create({
        data: {
          id: user.id,
          email,
          name: user.fullName!,
        },
      });
    }

    const body = await req.json();

    const productId = body.productId;

    // ✅ Ensure product exists
    const product = await db.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // ✅ Safe parsing of optional body
    const quantity = body.quantity || 1;

    let cart = await db.cart.findUnique({
      where: { userId: dbUser.id },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: { userId: dbUser.id },
      });
    }

    const existingItem = await db.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      await db.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await db.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
      });
    }

    return NextResponse.json({ message: "Product added to cart" });
  } catch (error: any) {
    console.error("POST /api/cart/[id] error:", error);
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { productId, quantity } = await req.json();

    if (!productId || quantity == null) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const cart = await db.cart.findUnique({
      where: { userId: user.id },
      include: { cartItems: true },
    });

    if (!cart)
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });

    await db.cartItem.updateMany({
      where: {
        cartId: cart.id,
        productId: productId,
      },
      data: {
        quantity,
      },
    });

    return NextResponse.json({ message: "Cart updated" });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const cart = await db.cart.findUnique({
      where: { userId: user.id },
      include: { cartItems: true },
    });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const itemToDelete = cart.cartItems.find(
      (item) => item.productId === productId
    );

    if (!itemToDelete) {
      return NextResponse.json(
        { message: "Product not found in cart" },
        { status: 404 }
      );
    }

    await db.cartItem.delete({
      where: {
        id: itemToDelete.id,
      },
    });

    return NextResponse.json({ message: "Product removed from cart" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
