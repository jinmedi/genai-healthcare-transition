import React, { createContext, useContext } from "react";

/**
 * 영상 변형.
 * - internal: 원내 대기실 상영용 (원본 문구)
 * - web:      홈페이지 게시용 (의료광고 기준으로 비교·과장·효과 보장 표현을 뺀 문구)
 */
export type Variant = "internal" | "web";

const VariantContext = createContext<Variant>("internal");

export const VariantProvider: React.FC<{ variant: Variant; children: React.ReactNode }> = ({ variant, children }) => (
  <VariantContext.Provider value={variant}>{children}</VariantContext.Provider>
);

export const useVariant = (): Variant => useContext(VariantContext);
