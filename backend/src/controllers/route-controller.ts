import { Request, Response } from "express";
import { RouteRequest } from "../domain/request/route-request";
import { Coordinate } from "../domain/common";
import { ApiResponse } from "../domain/response/api-response";

export class RouteController {
    static getRoute(req: Request, res: Response) {
        try {
            const routeReq: RouteRequest = req.body;

            // Validate req body
            if (!routeReq || !routeReq.src || !routeReq.dst) {
                throw new Error("invalid request body");
            };

            // Destructure to get src and dst
            const { src, dst } = routeReq;

            // TODO: generate waypoints
            const data: Coordinate[] = [];
            let pt;
            let i = 0;
            while (i <= 4) {
                pt = {
                    "latitude": src.latitude + (Math.random()-0.5)*0.005, 
                    "longitude": src.longitude + (Math.random()-0.5)*0.005
                    }
                if (pt.latitude > 1.13 && pt.latitude < 1.45 && pt.longitude > 103.6 && pt.longitude < 104) {
                    i += 1;
                    data.push(pt);
                } else {
                    continue;
                }
            }

            const apiResponse: ApiResponse<Coordinate[]> = {
                status: "success",
                data: data,
                error: "",
            }

            res.json(apiResponse);

            console.log("[RouteController.getRoute] Successfully GET route", data);
        } catch (err: any) {
            const message = err.message ?? "Failed to get route: An unexpected error occurred."

            const apiResponse: ApiResponse<null> = {
                status: "error",
                data: null,
                error: message,
            }

            res.json(apiResponse);

            console.log("[RouteController.getRoute] Failed to GET route", err);
        }
    }
}