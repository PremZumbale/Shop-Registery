/* Script to Show Table Below Clicked Customer */
document.addEventListener("DOMContentLoaded", function() {
    console.log("JS file is loaded!"); // Debugging message
    const customerItems = document.querySelectorAll("#customerList li");

    customerItems.forEach(item => {
        item.addEventListener("click", function() {
            // Hide all tables first
            document.querySelectorAll(".customer-table").forEach(table => {
                table.classList.remove("active");
            });
            
            // Find or create the table for this customer
            let table = item.querySelector(".customer-table");
            if (!table) {
                table = document.createElement("table");
                table.classList.add("customer-table", "active");
                table.innerHTML = `
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Details</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>${item.textContent}</td>
                        <td>Customer Info</td>
                    </tr>
                `;
                item.appendChild(table);
            }
            table.classList.add("active");
        });
    });
});
