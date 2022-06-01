class topsUtils {
  static hasPermission(userRole: string[], authArr?: string[]) {
    /**
     * If auth array is not defined
     * Pass and allow
     */
    if (authArr === null || authArr === undefined) {
      // console.info("auth is null || undefined:", authArr);
      return true;
    } else if (authArr.length === 0) {
      /**
       * if auth array is empty means,
       * allow only user role is guest (null or empty[])
       */
      // console.info("auth is empty[]:", authArr);
      return !userRole || userRole.length === 0;
    } else {
      /**
       * Check if user has grants
       */
      // console.info("auth arr:", authArr);
      /*
            Check if user role is array,
            */
      if (userRole && Array.isArray(userRole)) {
        return authArr.some((r) => userRole.indexOf(r) >= 0);
      }

      /*
            Check if user role is string,
            */
      return authArr.includes(userRole);
    }
  }

  static setRoutes(config: any) {
    let routes = [...config.routes];
    if (config.settings || config.auth) {
      routes = routes.map((route) => {
        let auth: any = config.auth ? [...config.auth] : null;
        auth = route.auth ? [...auth, ...route.auth] : auth;
        return {
          ...route,
          isPrivate: config.isPrivate || false,
          settings: { ...config.settings, ...route.settings },
          auth,
          type: config?.type ?? "",
          exact: true
        };
      });
    }

    return [...routes];
  }

  static generateRoutesFromConfigs(configs: any) {
    let allRoutes: any[] = [];
    configs.forEach((config: any) => {
      allRoutes = [...allRoutes, ...this.setRoutes(config)];
    });
    return allRoutes;
  }

  static getFlatNavigation(navigationItems: any[], flatNavigation: any[]) {
    flatNavigation = flatNavigation || [];
    for (const navItem of navigationItems) {
      if (navItem.type === "subheader") {
        continue;
      }

      if (navItem.type === "item") {
        flatNavigation.push({
          id: navItem.id,
          title: navItem.title,
          type: navItem.type,
          icon: navItem.icon || false,
          url: navItem.url,
          auth: navItem.auth || null
        });

        continue;
      }

      if (navItem.type === "collapse" || navItem.type === "group") {
        if (navItem.children) {
          this.getFlatNavigation(navItem.children, flatNavigation);
        }
      }
    }

    return flatNavigation;
  }
}

export default topsUtils;
