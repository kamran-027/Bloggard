import { Hono } from "hono";
import { verify } from "hono/jwt";
import { getPrismaClient } from "../common/functions";
import { updateBlogInput, addBlogInput } from "@kamrankhan027/common-app";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_PASS: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/blog/*", async (c, next) => {
  const header = c.req.header("Authorization");
  const token = header?.split(" ")[1] || "";
  try {
    const payload = await verify(token, c.env.JWT_PASS);
    c.set("userId", payload.id);
    await next();
  } catch (error) {
    c.status(403);
    return c.json({
      message: "User credentials invalid",
    });
  }
});

blogRouter.post("/blog", async (c) => {
  const body = await c.req.json();
  const prisma = getPrismaClient(c);
  const { success } = addBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      err: "Incorrect Inputs",
    });
  }

  try {
    const newBlog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("userId"),
      },
    });
    c.status(200);
    return c.json({
      message: `Post added successfully with ID as ${newBlog.id}`,
    });
  } catch (error) {
    c.status(200);
    return c.json({
      message: "Post added successfully",
    });
  }
});

blogRouter.put("/blog", async (c) => {
  const body = await c.req.json();
  const prisma = getPrismaClient(c);
  const { success } = updateBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      err: "Incorrect Inputs",
    });
  }

  try {
    const updatedBlog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      blog: updatedBlog,
    });
  } catch (error) {}
  c.status(500);
  return c.json({
    err: "Check details again",
  });
});

blogRouter.get("/blog/bulk", async (c) => {
  const prisma = getPrismaClient(c);
  try {
    const posts = await prisma.post.findMany();
    return c.json({
      blogs: posts,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      err: "Check details again",
    });
  }
});

blogRouter.get("/blog/:id", async (c) => {
  const blogId = c.req.param("id");

  const prisma = getPrismaClient(c);
  try {
    const blog = await prisma.post.findUnique({ where: { id: blogId } });

    return c.json(blog);
  } catch (error) {
    c.status(500);
    return c.json({
      err: "Check details again",
    });
  }
});
