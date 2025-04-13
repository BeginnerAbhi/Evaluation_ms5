function createOrderManager()
{
    let orders=[];

    return{

        addOrders(order)
        {
            orders.push(order);
        },

        updateOrder(id,newStatus)
        {
            let order=orders.find(order=>order.id===id);
            if(order)
            {
                order.status=newStatus;
            }
        },

        filterOrders(status)
        {
            return orders.filter(order=>order.status===status);
        },

        sortOrders(by)
        {
            return orders.sort((a,b)=>{
                if(by==="date")
                {
                    return new Date(a.date)-new Date(b.date);
                }
                else if(by==="status")
                {
                    return a.status.localCompare(b.status);
                }
            })
        },

        getTotalRevenue()
        {
            return orders.reduce((total,order)=>total+order.price,0);
        },

        exportOrders()
        {
            return JSON.stringify(orders,null,2);
        }


    }
}

//usage
const manager = createOrderManager();
manager.addOrders({ id: 1, customerName: "Alice", items: [{ name: "Laptop", price: 1000, quantity: 1 }], status: "pending", createdAt: new Date("2024-03-01") });
manager.addOrders({ id: 2, customerName: "Bob", items: [{ name: "Phone", price: 500, quantity: 2 }], status: "shipped", createdAt: new Date("2024-03-02") });
console.log(manager.filterOrders("pending"));

console.log(manager.getTotalRevenue());

