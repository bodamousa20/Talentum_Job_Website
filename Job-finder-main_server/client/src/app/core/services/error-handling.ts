import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ErrorHandler {
  static handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return new Observable<never>((observer) => {
      observer.error(errorMessage);
    });
  }
}
