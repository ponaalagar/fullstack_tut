some errors 
200 – OK The request was successfully processed, and the server returned the expected response. Example: When requesting a product list, the server returns the list in JSON format.

201 – Created The request was successful, and the server created a new resource. Example: Submitting a registration form that results in a new user being created.

400 – Bad Request The request is invalid, incomplete, or cannot be understood by the server. Example: Submitting a form with required fields left empty.

401 – Unauthorized Authentication has not been provided or is invalid. Valid credentials are required for access. Example: Sending a request to a protected API without logging in.

403 – Forbidden Authentication is provided but the user does not have permission to access the resource. Example: A regular user attempting to access the admin panel.

404 – Not Found The requested resource could not be found on the server. Example: Navigating to a non-existent URL.

500 – Internal Server Error The server encountered an unexpected error while processing the request. Example: A coding error or a database connection failure.

✅ Summary:

2xx → Successful operations

4xx → Client-side errors

5xx → Server-side errors

