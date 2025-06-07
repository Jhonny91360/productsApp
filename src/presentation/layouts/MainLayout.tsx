/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MyIcon} from '../components/ui/MyIcon';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title: string;
  subTitle?: string;

  rightAction?: () => void;
  rightActionIcon?: string;

  children: React.ReactNode;
}
export const MainLayout = ({
  title,
  subTitle,
  children,
  rightAction,
  rightActionIcon,
}: Props) => {
  const {top} = useSafeAreaInsets();

  const {canGoBack, goBack} = useNavigation();

  const renderBackAction = () => (
    <TopNavigationAction
      icon={<MyIcon name="arrow-back-outline" />}
      onPress={goBack}
    />
  );

  const RenderRightIcon = () => {
    if (!rightAction || !rightActionIcon) {
      return null;
    }
    return (
      <TopNavigationAction
        onPress={rightAction}
        icon={<MyIcon name={rightActionIcon} />}
      />
    );
  };

  return (
    <Layout style={{paddingTop: top}}>
      <TopNavigation
        title={title}
        subtitle={subTitle}
        alignment="center"
        accessoryLeft={canGoBack() ? renderBackAction : undefined}
        accessoryRight={() => <RenderRightIcon />}
      />
      <Divider />
      <Layout style={{height: '100%'}}>{children}</Layout>
    </Layout>
  );
};
