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
import { Action, Blink, ActionsRegistry, useAction, defaultActionSupportStrategy, NextAction, CompletedAction, DEFAULT_SUPPORTED_BLOCKCHAIN_IDS, BASELINE_ACTION_VERSION } from "@dialectlabs/blinks";
//import { useAction } from '@dialectlabs/blinks/react';
import { useActionSolanaWalletAdapter } from '@dialectlabs/blinks/hooks/solana';
import { UnsafeBurnerWalletAdapter, PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

import {
	ConnectionProvider,
	WalletProvider,
  } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

export default async function BlinkPage() {

	//const actionApiUrl = 'solana-action:http://saftie.saft.industries/solana-actions/';
	const actionApiUrl = 'solana-action:https://dial.to/api/donate';
	//const actionApiUrl = "solana-action:http://localhost:3000/solana-actions/bd54f639-fe6c-4ebb-8e33-ac7c942bd2b2";
	const endpoint = import.meta.env.REACT_APP_PUBLIC_SOLANA_RPC_URL;


	const { adapter } = useActionSolanaWalletAdapter(
		endpoint,
	);

	const { action, isLoading } = useAction({
		url: actionApiUrl,
		adapter,
	});

/*
	//const action = await Action.fetch(actionApiUrl);
	const action = Action.hydrate(actionApiUrl, 
		{
		type: "completed",
		icon: "https://saftie.saft.industries/src/client/static/saftie.png",
		title: "Saftie, frictionless Solana donation blinks",
		description: "There was a problem locating your Saftie :/",
		label: "Send!",}
		, {
			blockchainIds: DEFAULT_SUPPORTED_BLOCKCHAIN_IDS,
			version: BASELINE_ACTION_VERSION
		}, defaultActionSupportStrategy);
*/

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
            new PhantomWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [WalletAdapterNetwork.Devnet]
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
