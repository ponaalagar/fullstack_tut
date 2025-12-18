# 🚦 HTTP Status Codes Guide

A complete reference guide to HTTP response status codes, categorized by their class.

> [!NOTE]
> HTTP status codes are three-digit integers returned by a server to indicate the status of a client's request.

---

## ℹ️ 1xx: Informational
*Request received, continuing process.*

| Code | Status | Description | Example |
| :--- | :--- | :--- | :--- |
| **100** | **Continue** | The initial part of a request has been received and has not yet been rejected by the server. | Uploading a large file; server says "go ahead". |
| **101** | **Switching Protocols** | The server understands and is willing to comply with the client's request to switch protocols. | Upgrading a connection from HTTP to WebSocket. |

---

## ✅ 2xx: Success
*The action was successfully received, understood, and accepted.*

| Code | Status | Description | Example |
| :--- | :--- | :--- | :--- |
| **200** | **OK** | Standard response for successful HTTP requests. | Requesting a generic web page or JSON API. |
| **201** | **Created** | The request has been fulfilled, resulting in the creation of a new resource. | Making a POST request to create a new user account. |
| **204** | **No Content** | The server successfully processed the request and is not returning any content. | DELETE request where the item is removed, so nothing is returned. |

---

## ↪️ 3xx: Redirection
*Further action must be taken in order to complete the request.*

| Code | Status | Description | Example |
| :--- | :--- | :--- | :--- |
| **301** | **Moved Permanently** | The URL of the requested resource has been changed permanently. | Converting "http" site to "https". |
| **302** | **Found** | The URL of the requested resource has been changed temporarily. | Redirecting a user to a login page while maintenance is ongoing. |
| **304** | **Not Modified** | Indicates that the resource has not been modified since the version specified by the request headers. | Browser uses cached CSS file instead of downloading it again. |

---

## 🚫 4xx: Client Error
*The request contains bad syntax or cannot be fulfilled.*

| Code | Status | Description | Example |
| :--- | :--- | :--- | :--- |
| **400** | **Bad Request** | The server cannot or will not process the request due to an apparent client error. | Malformed JSON in a POST request or missing parameters. |
| **401** | **Unauthorized** | Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. | Accessing a dashboard without logging in. |
| **403** | **Forbidden** | The request was valid, but the server is refusing action. The user might not have the necessary permissions. | Trying to access admin settings as a regular user. |
| **404** | **Not Found** | The requested resource could not be found but may be available in the future. | Typing a URL that doesn't exist. |
| **405** | **Method Not Allowed** | A request method is not supported for the requested resource. | Trying to POST to a read-only (GET) endpoint. |
| **429** | **Too Many Requests** | The user has sent too many requests in a given amount of time ("rate limiting"). | Hitting an API limit by refreshing too fast. |

---

## 💥 5xx: Server Error
*The server failed to fulfill an apparently valid request.*

| Code | Status | Description | Example |
| :--- | :--- | :--- | :--- |
| **500** | **Internal Server Error** | A generic error message, given when an unexpected condition was encountered and no more specific message is suitable. | Unhandled exception in the backend code (e.g., variable is undefined). |
| **502** | **Bad Gateway** | The server was acting as a gateway or proxy and received an invalid response from the upstream server. | Nginx acting as specific proxy getting an invalid response from a Node app. |
| **503** | **Service Unavailable** | The server is currently unable to handle the request due to a temporary overloading or maintenance of the server. | Server is down for maintenance or overloaded with traffic. |
| **504** | **Gateway Timeout** | The server was acting as a gateway or proxy and did not receive a timely response from the upstream server. | Database query taking too long to respond to the web server. |
