class ApiResponse {
    constructor(data, message = "Success") {
        this.statusCode = 200;
        this.success = true;
        this.message = message;
        this.data = data;
    }
}

export { ApiResponse };