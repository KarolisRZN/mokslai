import PostContent from "./PostContent";
import { v4 as uuidv4 } from "uuid";

export default function PostsList() {
  const posts = [
    {
      title: "HTML",
      content: "Lorem ipsum HTML",
      img: "https://zucchini.co.ke/cdn/shop/collections/fruit_6c22f2fd-8fa9-4417-a6a3-917ffc5cde9e.jpg?v=1724505412",
    },
    {
      title: "CSS",
      content: "Lorem ipsum CSS",
      img: "https://www.financialexpress.com/wp-content/uploads/2024/10/fruit-700006_1280.jpg?w=440",
    },
    {
      title: "JavaScript",
      content: "Lorem ipsum JavaScript",
      img: "https://www.eatright.org/-/media/images/eatright-articles/eatright-article-feature-images/discoverthehealthbenefitsofproduce_600x450.jpg?as=0&w=967&rev=ee66bf64d4c347fd9031b67002054317&hash=EB94D5B63642F4DE1A752666C6A84366",
    },
  ];

  const list = posts.map((post) => {
    return (
      <PostContent
        key={uuidv4()}
        title={post.title}
        content={post.content}
        img={post.img}
      />
    );
  });

  return <div>{list}</div>;
}
