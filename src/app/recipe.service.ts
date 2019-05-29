import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Recipe } from "./model/recipe.model";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  private apiUrl = "http://localhost:3000/recipes";
  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(this.apiUrl)
      .pipe(retry(1), catchError(this.handleError));
  }

  getRecipe(id) {
    return this.http
      .get<Recipe>(`${this.apiUrl}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  createRecipe(recipe: Recipe) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "my-auth-token"
      })
    };
    return this.http
      .post(`${this.apiUrl}`, recipe, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateRecipe(recipe: Recipe) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "my-auth-token"
      })
    };
    return this.http
      .patch(`${this.apiUrl}/${recipe._id}`, recipe, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteRecipe(id) {
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error: ${error.status} \n ${error.message}`;
    }
    alert(errorMessage);
    return throwError(errorMessage);
  }
}
