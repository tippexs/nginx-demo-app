export class ErrorHandlingFetch {
        constructor() {  }

        public async fetch(
            input: Request | string,
            init?: RequestInit,
        ): Promise<Response> {
                const response = await fetch(input, init);
                if (response.status === 401) {
                        console.log('error');
                        return response;
                }
                return response;
        }
}