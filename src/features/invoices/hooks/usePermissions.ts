import { useAuthStore } from "../store/useAuthStore";
import { Permission, ROLE_PERMISSIONS } from "../types/auth";

export function usePermissions() {
  const { currentRole } = useAuthStore();

  const hasPermission = (permission: Permission): boolean => {
    return ROLE_PERMISSIONS[currentRole].includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some((permission) => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every((permission) => hasPermission(permission));
  };

  return {
    currentRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
}
