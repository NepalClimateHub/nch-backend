/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Scope = "individual" | "nch" | "organization";

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Users {
  created_at: Generated<Timestamp>;
  email: string;
  emailVerificationExpiryTime: Timestamp | null;
  emailVerificationToken: string | null;
  expertise: string | null;
  full_name: string;
  gender: string;
  id: Generated<number>;
  isActive: Generated<boolean | null>;
  isEmailVerified: Generated<boolean | null>;
  password: string;
  profession: string | null;
  requiresPasswordChange: Generated<boolean | null>;
  resetPasswordExpiryTime: Timestamp | null;
  resetPasswordToken: string | null;
  scope: Generated<Scope | null>;
  updated_at: Generated<Timestamp>;
}

export interface DB {
  users: Users;
}
