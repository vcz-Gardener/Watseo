export type SignUpFunnelSteps = {
  church: object;
  name: { church: string };
  password: { church: string; name: string };
  role: { church: string; name: string; password: string };
  complete: { church: string; name: string; password: string; role: string };
};

/**
 * FunnelStep: 각 스텝 컴포넌트가 받는 props를 정의합니다.
 * - context: 해당 스텝의 컨텍스트 타입
 * - onNext: 다음 스텝으로 전달할 컨텍스트를 명시적으로 받습니다.
 * - onPrev: 이전 스텝으로 돌아가는 콜백입니다.
 */
export type FunnelStep<TSteps, TStepKey extends keyof TSteps> = {
  context: TSteps[TStepKey];
  onNext: (ctx: TSteps[TStepKey]) => void;
  onPrev: () => void;
};

/**
 * StepProps: SignUpFunnelSteps에 대해 FunnelStep을 적용한 타입 별칭입니다.
 */
export type StepProps<K extends keyof SignUpFunnelSteps> = FunnelStep<
  SignUpFunnelSteps,
  K
>;

export type NameStepProps = {
  church: string; // 이전 스텝 church 값
  onNext: (ctx: { church: string; name: string }) => void;
  onPrev: () => void;
};
