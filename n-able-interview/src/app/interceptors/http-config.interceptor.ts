import {
  HttpHeaders,
  HttpInterceptorFn,
  HttpResponse,
} from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { inject } from "@angular/core";
import { LoaderService } from "../services/loader.service";
import { finalize, tap } from "rxjs";

export const httpConfigInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  loaderService.ShowLoader();
  const headers = new HttpHeaders({
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": environment.apiVersion,
    "Authorization": `Bearer ${environment.token}`,
  });
  const withHeaders = req.clone({ headers });
  return next(withHeaders).pipe(
    tap({
      next: (req) => {
        if (req instanceof HttpResponse) {
          loaderService.HideLoader();
        }
      },
      error: () => {
        loaderService.HideLoader();
      },
    }),
    finalize(() => {
      loaderService.HideLoader();
    }),
  );
};
