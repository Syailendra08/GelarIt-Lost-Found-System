import ItemCard from "./ItemCard";


export default function ItemList({ data }) {
  return (
    <div className="flex gap-6 justify-center flex-wrap px-10 pb-20">

      {data.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
        />
      ))}

    </div>
  );
}