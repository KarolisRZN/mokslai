import Header from "./components/Header";
import PostImage from "./components/PostImage";
import PostContent from "./components/PostContent";
import Box from "./components/Box";
import "./App.css";

export default function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Header 
          title="Labas, aš mokausi"
          link="src/assets/cat-under-tree.jpg"
          />
        </div>
      </div>
      {/* ... */}

      <div className="row">
        <div className="col-12 col-sm-6">
          <PostImage 
          link="src/assets/cat-under-tree.jpg"
          />
          <PostContent 
          title="Post title"
          paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nobis
        perspiciatis quis reiciendis, fugit doloremque quisquam iusto ratione
        nostrum odio aperiam repudiandae inventore asperiores ea illum! Nobis
        cumque id optio?"
          />
        </div>
        <div className="col-12 col-sm-6">
          <PostImage 
          link="src/assets/cat-under-tree.jpg"
          />
          <PostContent 
          title="Post title"
          paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nobis
        perspiciatis quis reiciendis, fugit doloremque quisquam iusto ratione
        nostrum odio aperiam repudiandae inventore asperiores ea illum! Nobis
        cumque id optio?"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-6 mb-2 col-sm-3">
          <Box />
        </div>
        <div className="col-6 mb-2 col-sm-3">
          <Box />
        </div>
        <div className="col-6 mb-2 col-sm-3">
          <Box />
        </div>
        <div className="col-6 mb-2 col-sm-3">
          <Box />
        </div>
      </div>
    </div>
  );
}
