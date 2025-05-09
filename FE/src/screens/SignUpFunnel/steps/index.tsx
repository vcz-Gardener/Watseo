import React from 'react';
import { View } from 'react-native';
import { useFunnel } from '@use-funnel/react-navigation-native';

import ChurchStep from './ChurchStep';
import NameStep from './NameStep';
import PasswordStep from './PasswordStep';
import RoleStep from './RoleStep';
import CompleteStep from './CompleteStep';

import { funnelOptions } from '../../../utils/useSignUpFunnel';
import { SignUpFunnelSteps } from '@screens/SignUpFunnel/types';

export default function SignUpFunnel() {
  const funnel = useFunnel<SignUpFunnelSteps>(funnelOptions);

  // 1) 매 렌더마다 현재 스텝과 컨텍스트 찍어보기
  console.log('🔍 current step:', funnel.step);
  console.log('🔍 full context:', funnel.context);

  return (
    <View style={{ flex: 1 }}>
      <funnel.Render
        church={({ history }) => (
          <ChurchStep onNext={(ctx) => history.push('name', ctx)} />
        )}
        name={({ context, history }) => (
          <NameStep
            church={context.church}
            onNext={(ctx) => history.push('password', ctx)}
            onPrev={() => history.back()}
          />
        )}
        password={({ context, history }) => (
          <PasswordStep
            context={context}
            onNext={(ctx) => history.push('role', ctx)}
            onPrev={() => history.back()}
          />
        )}
        role={({ context, history }) => (
          <RoleStep
            context={context}
            onNext={(ctx) => history.push('complete', ctx)}
            onPrev={() => history.back()}
          />
        )}
        complete={({ context }) => <CompleteStep context={context} />}
      />
    </View>
  );
}
