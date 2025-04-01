import { HttpHeaders, HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../environments/environment.development";

export const httpConfigInterceptor: HttpInterceptorFn = (req, next) => {
  const headers = new HttpHeaders({
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": environment.apiVersion,
    "Authorization": `Bearer ${environment.token}`,
  });
  const withHeaders = req.clone({ headers });
  return next(withHeaders);
};
