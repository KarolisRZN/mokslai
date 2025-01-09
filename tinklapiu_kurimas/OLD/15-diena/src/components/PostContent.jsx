export default function PostContent({ title, content, img }) {
    return (
        <div>
            <h2>{title}</h2>
            <img 
            src={img}
            alt={title}
        />
        <p>{content}</p>
        </div>
    );
}