import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePermissions } from "./usePermissions";
import { useAuthStore } from "../store/useAuthStore";
import { Role } from "../types/auth";

describe("usePermissions (RBAC)", () => {
  beforeEach(() => {
    useAuthStore.setState({ currentRole: "SALES" });
  });

  it("should return the correct initial role", () => {
    const { result } = renderHook(() => usePermissions());
    expect(result.current.currentRole).toBe("SALES");
  });

  it("should allow SALES to create invoices", () => {
    const { result } = renderHook(() => usePermissions());
    expect(result.current.hasPermission("CREATE_INVOICE")).toBe(true);
  });

  it("should NOT allow SALES to approve invoices", () => {
    const { result } = renderHook(() => usePermissions());
    expect(result.current.hasPermission("APPROVE_INVOICE")).toBe(false);
  });

  it("should allow MANAGER to approve invoices", () => {
    useAuthStore.setState({ currentRole: "MANAGER" });
    const { result } = renderHook(() => usePermissions());
    expect(result.current.hasPermission("APPROVE_INVOICE")).toBe(true);
  });

  it("should correctly evaluate hasAnyPermission", () => {
    const { result } = renderHook(() => usePermissions());
    // SALES has CREATE_INVOICE but not APPROVE_INVOICE
    expect(result.current.hasAnyPermission(["CREATE_INVOICE", "APPROVE_INVOICE"])).toBe(true);
    expect(result.current.hasAnyPermission(["DELETE_INVOICE", "APPROVE_INVOICE"])).toBe(false);
  });

  it("should correctly evaluate hasAllPermissions", () => {
    const { result } = renderHook(() => usePermissions());
    // SALES has CREATE_INVOICE and SUBMIT_INVOICE
    expect(result.current.hasAllPermissions(["CREATE_INVOICE", "SUBMIT_INVOICE"])).toBe(true);
    expect(result.current.hasAllPermissions(["CREATE_INVOICE", "APPROVE_INVOICE"])).toBe(false);
  });
});
