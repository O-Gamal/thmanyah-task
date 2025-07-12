import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getApiInfo() {
    return {
      name: "Thmanyah Content Directory API",
      version: "1.0.0",
      status: "active",
      endpoints: {
        search: "/api/search-media",
        getPodcast: "/api/search-media/:id",
      },
      documentation: "Welcome to the Thmanyah Content Directory API",
    };
  }

  @Get("health")
  getHealth() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}
