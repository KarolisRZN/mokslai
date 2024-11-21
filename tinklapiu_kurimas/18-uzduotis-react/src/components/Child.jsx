export default function Child(props) {
    return (
        <ul>
            {props.items.map((item,index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
}