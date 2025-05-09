import {
  type UseFunnelOptions, // ← 여기
} from '@use-funnel/react-navigation-native';
import type { SignUpFunnelSteps } from '@screens/SignUpFunnel/types';

// 1️⃣ `UseFunnelOptions<SignUpFunnelSteps>` 로 강제 검사
export const funnelOptions: UseFunnelOptions<SignUpFunnelSteps> = {
  id: 'signup-flow',
  initial: {
    step: 'church', // keyof SignUpFunnelSteps
    context: {}, // SignUpFunnelSteps['church'] === {}
  },
  steps: {
    church: {
      // 반드시 (ctx) 파라미터를 받고, ctx is TContext 형식의 리턴 타입을 가진다
      guard: (ctx): ctx is SignUpFunnelSteps['church'] => true,
    },
    name: {
      guard: (ctx): ctx is SignUpFunnelSteps['name'] =>
        typeof ctx.church === 'string',
    },
    password: {
      guard: (ctx): ctx is SignUpFunnelSteps['password'] =>
        typeof ctx.name === 'string',
    },
    role: {
      guard: (ctx): ctx is SignUpFunnelSteps['role'] =>
        typeof ctx.password === 'string',
    },
    complete: {
      guard: (ctx): ctx is SignUpFunnelSteps['complete'] =>
        typeof ctx.role === 'string',
    },
  },
};
