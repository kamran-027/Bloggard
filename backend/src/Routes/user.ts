import { Hono } from "hono";
import { getPrismaClient } from "../common/functions";
import bcrypt from "bcryptjs";
import { sign } from "hono/jwt";
import { signInInput, signUpInput } from "@kamrankhan027/common-app";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_PASS: string;
  };
}>();

let saltRounds = 10;

userRouter.post("/signup", async (c) => {
  const prisma = getPrismaClient(c);
  const body = await c.req.json();

  const { success } = signUpInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      err: "Incorrect Inputs",
    });
  }

  try {
    //Hashing Password
    let hash = await bcrypt.hash(body.password, saltRounds);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hash,
      },
    });

    //Generating Token
    const token = await sign({ id: user.id }, c.env.JWT_PASS);

    return c.json({
      token: token,
    });
  } catch (error) {
    c.status(403);
    return c.json({ err: error });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = getPrismaClient(c);
  const body = await c.req.json();

  const { success } = signInInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.text("Incorrect Inputs");
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    const isUserValid = existingUser
      ? await bcrypt.compare(body.password, existingUser?.password)
      : false;

    if (!isUserValid) {
      c.status(403);
      return c.json({
        err: "User not found",
      });
    }
    const token = await sign({ id: existingUser?.id }, c.env.JWT_PASS);

    return c.json({
      token: token,
    });
  } catch (error) {
    c.status(411);
    return c.json({ err: "Error while Signing, check creds again" });
  }
});
