import {ErrorHandlingFetch} from "../../environment/ErrorHandlingFetch";

export class DashboardService {

    private errorHandlingFetch: ErrorHandlingFetch;

    constructor() {
        this.errorHandlingFetch = new ErrorHandlingFetch();
    }

    async deleteTicketById(id: string) {
        const response = await this.errorHandlingFetch.fetch(
            `http://localhost:8080/ticket/${id}`,
            {
                method: 'DELETE'
            }
        );

        if (response.status != 204) {
            return false;
        } else {
            return response.ok;
        }
    }

    async getAllTickets() {
        const response = await this.errorHandlingFetch.fetch(
            `http://localhost:8080/ticket`,
            {
                method: 'GET'
            }
        );

        if (response.status != 200) {
            return false;
        } else {
            return response.json();
        }
    }

}