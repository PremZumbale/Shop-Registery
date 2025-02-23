document.addEventListener("DOMContentLoaded", function () {
    // Display customer list
    const customerList = document.getElementById("customerList");

    function renderCustomerList() {
        customerList.innerHTML = "";
        const customers = JSON.parse(localStorage.getItem("customers")) || [];
        customers.forEach((customer, index) => {
            const li = document.createElement("li");
            li.textContent = customer.name;
            li.style.cursor = "pointer";
            li.addEventListener("click", () => showCustomerDetails(index, li));
            customerList.appendChild(li);
        });
    }

    function showCustomerDetails(index, listItem) {
        // Remove existing details if any
        document.querySelectorAll(".customer-details-table").forEach(table => table.remove());

        const customers = JSON.parse(localStorage.getItem("customers")) || [];
        const customer = customers[index];

        // Create new table
        const table = document.createElement("table");
        table.classList.add("customer-details-table");
        table.innerHTML = `<tr><th>Field</th><th>Value</th><th>Actions</th></tr>`;

        Object.keys(customer).forEach(key => {
            if (key !== "name") {
                const row = document.createElement("tr");
                row.innerHTML = `<td><strong>${key}</strong></td>
                                <td><input type="text" value="${customer[key]}" data-key="${key}" class="edit-input"></td>
                                <td><button class="save-btn">Save</button></td>`;
                table.appendChild(row);
            }
        });

        // Add delete button
        const deleteRow = document.createElement("tr");
        deleteRow.innerHTML = `<td colspan="3"><button class="delete-btn">Delete Customer</button></td>`;
        table.appendChild(deleteRow);

        // Insert the table directly below the clicked customer
        listItem.insertAdjacentElement("afterend", table);

        // Handle Save action
        table.querySelectorAll(".save-btn").forEach(button => {
            button.addEventListener("click", function () {
                const inputs = table.querySelectorAll(".edit-input");
                inputs.forEach(input => {
                    const key = input.getAttribute("data-key");
                    customer[key] = input.value;
                });
                customers[index] = customer;
                localStorage.setItem("customers", JSON.stringify(customers));
                renderCustomerList();
            });
        });

        // Handle Delete action
        table.querySelector(".delete-btn").addEventListener("click", function () {
            customers.splice(index, 1);
            localStorage.setItem("customers", JSON.stringify(customers));
            renderCustomerList();
        });
    }

    renderCustomerList();
});
