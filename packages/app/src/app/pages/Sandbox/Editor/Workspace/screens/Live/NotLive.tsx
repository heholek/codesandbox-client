import React from 'react';
import css from '@styled-system/css';

import {
  Element,
  Collapsible,
  Stack,
  Text,
  Button,
} from '@codesandbox/components';
import { useOvermind } from 'app/overmind';

import { LiveIcon } from './icons';

export const NotLive = () => {
  const {
    state: {
      editor: {
        currentSandbox: { owned },
      },
    },
  } = useOvermind();

  return (
    <Collapsible title="Live" defaultOpen>
      <Element css={css({ paddingX: 2 })}>
        <Text block weight="medium" marginBottom={2}>
          Collaborate in real-time
        </Text>
        {owned ? <Owner /> : <NotOwner />}
      </Element>
    </Collapsible>
  );
};

const Owner = () => {
  const {
    actions: {
      live: { createLiveClicked },
    },
    state: {
      editor: {
        currentSandbox: { id },
        isAllModulesSynced,
      },
      live: { isLoading },
    },
  } = useOvermind();
  return (
    <>
      <Stack direction="vertical" gap={2} marginBottom={6}>
        <Text size={2} variant="muted" block>
          Invite others to live edit this sandbox with you.
        </Text>
        <Text size={2} variant="muted" block>
          To invite others you need to generate a URL that others can join.
        </Text>
      </Stack>
      <Button
        variant="danger"
        disabled={!isAllModulesSynced}
        onClick={() => createLiveClicked(id)}
      >
        {isLoading ? (
          'Creating session'
        ) : (
          <>
            <LiveIcon css={css({ marginRight: 2 })} />
            <span>Go Live</span>
          </>
        )}
      </Button>
    </>
  );
};

const NotOwner = () => {
  const {
    actions: {
      editor: { forkSandboxClicked },
    },
    state: {
      editor: { isForkingSandbox },
    },
  } = useOvermind();

  return (
    <>
      <Stack direction="vertical" gap={2} marginBottom={6}>
        <Text size={2} variant="muted" block>
          You need to own this sandbox to open a live session to collaborate
          with others in real time.
        </Text>
        <Text size={2} variant="muted" block>
          Fork this sandbox to live share it with others!
        </Text>
      </Stack>
      <Button
        variant="primary"
        disabled={isForkingSandbox}
        onClick={() => forkSandboxClicked()}
      >
        Fork Sandbox
      </Button>
    </>
  );
};
