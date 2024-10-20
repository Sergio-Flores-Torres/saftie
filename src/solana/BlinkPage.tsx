import { type Task, type Saftie } from 'wasp/entities';

import {
  generateGptResponse,
  deleteSaftie,
  useQuery,
  getAllSaftiesByUser,
  createSaftie,
} from 'wasp/client/operations';

import { cn } from '../client/cn';

import '@dialectlabs/blinks/index.css';
import { useState, useEffect, useMemo } from 'react';
import { Action, Blink, ActionsRegistry, useAction, } from "@dialectlabs/blinks";
//import { useAction } from '@dialectlabs/blinks/react';
import { useActionSolanaWalletAdapter } from '@dialectlabs/blinks/hooks/solana';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';

import {
	ConnectionProvider,
	WalletProvider,
  } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

export default function BlinkPage() {

	//const actionApiUrl = 'solana-action:http://saftie.saft.industries/solana-actions/';
	const actionApiUrl = 'solana-action:https://dial.to/api/donate';
	const endpoint = import.meta.env.REACT_APP_PUBLIC_SOLANA_RPC_URL;

	const { adapter } = useActionSolanaWalletAdapter(
		endpoint,
	);

	const { action, isLoading } = useAction({
		url: actionApiUrl,
		adapter,
	});

    const wallets = useMemo(
        () => [
            /**
             * Wallets that implement either of these standards will be available automatically.
             *
             *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
             *     (https://github.com/solana-mobile/mobile-wallet-adapter)
             *   - Solana Wallet Standard
             *     (https://github.com/anza-xyz/wallet-standard)
             *
             * If you wish to support a wallet that supports neither of those standards,
             * instantiate its legacy wallet adapter here. Common legacy adapters can be found
             * in the npm package `@solana/wallet-adapter-wallets`.
             */
            new UnsafeBurnerWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [endpoint]
    );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
			{action ?
			<Blink action={action} websiteText={new URL(actionApiUrl).hostname} />
			: null}
		</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
