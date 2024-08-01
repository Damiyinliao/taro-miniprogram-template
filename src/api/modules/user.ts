import request from "../service/request";

export function login(data: any) {
  return request.get(`/login`, data);
}
