import Child from "./Child";

export default function Parent() {
    const items = ["React", "JavaScript", "CSS"];
    return (
        <div>
            <h1> Items List</h1>
            <Child items={items} />
        </div>
    );
}