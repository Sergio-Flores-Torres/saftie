import { type Task, type Saftie } from 'wasp/entities';

import {
  generateGptResponse,
  deleteSaftie,
  useQuery,
  getAllSaftiesByUser,
  createSaftie,
} from 'wasp/client/operations';

import { useState, useMemo } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { TiDelete, TiClipboard } from 'react-icons/ti';
import { cn } from '../client/cn';

export default function BlinkPage() {

  return (
    <div className='py-10 lg:mt-10'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white'>
            <span className='text-yellow-500'>Saftie</span> Manager
          </h2>
        </div>
        <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-white'>
          Create/Delete your Safties below. Each Saftie will need a destination Solana address and an amount in 
          USDC; with that, you'll get a Solana Blink that you can share with your donors on the Internet!
        </p>
        {/* begin AI-powered Todo List */}
        <div className='my-8 border rounded-3xl border-gray-900/10 dark:border-gray-100/10'>
          <div className='sm:w-[90%] md:w-[70%] lg:w-[60%] py-10 px-6 mx-auto my-8 space-y-10'>
            

          </div>
        </div>
        {/* end AI-powered Todo List */}
      </div>
    </div>
  );
}
