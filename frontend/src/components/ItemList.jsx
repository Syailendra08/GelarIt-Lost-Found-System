import { useEffect, useState } from "react"
import ItemCard from "./ItemCard"
import axios from "axios"

export default function ItemList() {
  const [items, setItems] = useState([])

  async function getItems() {
    try {

         const token = localStorage.getItem("token")
      const response = await axios.get(
      "http://localhost:3000/items",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    setItems(response.data.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getItems()
  }, [])

  return (
    <div className="flex gap-6 justify-center flex-wrap px-10 pb-20">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
        />
      ))}
    </div>
  )
}