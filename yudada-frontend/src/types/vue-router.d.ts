// src/types/vue-router.d.ts
declare module "vue-router" {
  import type { Component, App } from "vue";

  // 定义路由守卫回调类型
  type NavigationGuard = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: (to?: any) => void
  ) => Promise<void> | void;

  // 定义路由位置类型
  export interface RouteLocationNormalized {
    path: string;
    name?: string;
    meta: Record<string, any>;
    params: Record<string, string>;
    query: Record<string, string>;
  }

  // 定义路由记录类型
  export interface RouteRecordRaw {
    path: string;
    name?: string;
    component?: Component | (() => Promise<Component>);
    children?: RouteRecordRaw[];
    meta?: Record<string, any>;
  }

  // 定义路由实例类型（补充beforeEach等方法）
  export interface Router {
    install: (app: App) => void;
    push: (path: string | object) => Promise<void>;
    beforeEach: (guard: NavigationGuard) => void;
    afterEach: (guard: NavigationGuard) => void;
    currentRoute: RouteLocationNormalized;
  }

  // 完善createRouter返回类型
  export function createRouter(options: {
    history: ReturnType<typeof createWebHistory>;
    routes: RouteRecordRaw[];
  }): Router;

  export function createWebHistory(base?: string): any;
  export function useRoute(): RouteLocationNormalized;
  export function useRouter(): Router;
}
