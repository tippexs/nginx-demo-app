
import { ErrorHandlingFetch } from "../environment/ErrorHandlingFetch";

export class SupportRequestService {
    private errorHandlingFetch: ErrorHandlingFetch;

    constructor() {
        this.errorHandlingFetch = new ErrorHandlingFetch();
    }

    async sendSupportRequest(title: string|any, text: string|any): Promise<boolean> {

        const response = await this.errorHandlingFetch.fetch(
          `http://localhost:8080/ticket?headline=${title}&text=${text}`,
            {
                method: 'POST'
            }
        );

        if (response.status != 201) {
            return false;
        } else {
            return response.ok
        }
    }
}
