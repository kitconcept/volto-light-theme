import config from '@plone/volto/registry';
import { useSelector } from 'react-redux';
import { BlocksConfigMerger } from '../../helpers/BlocksConfigMerger';
import type { Content } from '@plone/types';
import type { MutatorDSL } from '../../types';

type FormState = {
  content: {
    data: Content;
  };
};

const ConfigInjector = () => {
  const blockConfigData = useSelector<FormState, MutatorDSL>(
    (state) =>
      state.content.data?.['@components']?.inherit?.['kitconcept.blocks.config']
        ?.data?.blocks_config_mutator,
  );

  if (blockConfigData) {
    config.blocks.blocksConfig = BlocksConfigMerger(
      config.blocks.blocksConfig,
      blockConfigData,
    );
  }

  // This component does not render anything, it just injects config from the Redux
  // store in the global config
  return null;
};

export default ConfigInjector;
