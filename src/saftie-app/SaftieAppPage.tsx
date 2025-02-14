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
import type { GeneratedSchedule, MainTask, SubTask } from './schedule';
import { cn } from '../client/cn';

export default function SaftieAppPage() {

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
            <NewSaftieForm handleCreateSaftie={createSaftie} />
          </div>
        </div>
        {/* end AI-powered Todo List */}
      </div>
    </div>
  );
}

function NewSaftieForm({ handleCreateSaftie }: { handleCreateSaftie: typeof createSaftie }) {
  const [address, setAddress] = useState<string>('');
  const [amount, setAmount] = useState<number>(1);
  const [error, setError] = useState('');

  /*
  const [response, setResponse] = useState<GeneratedSchedule | null>({
    mainTasks: [
      {
        name: 'Respond to emails',
        priority: 'high',
      },
      {
        name: 'Learn WASP',
        priority: 'low',
      },
      {
        name: 'Read a book',
        priority: 'medium',
      },
    ],
    subtasks: [
      {
        description: 'Read introduction and chapter 1',
        time: 0.5,
        mainTaskName: 'Read a book',
      },
      {
        description: 'Read chapter 2 and take notes',
        time: 0.3,
        mainTaskName: 'Read a book',
      },
      {
        description: 'Read chapter 3 and summarize key points',
        time: 0.2,
        mainTaskName: 'Read a book',
      },
      {
        description: 'Check and respond to important emails',
        time: 1,
        mainTaskName: 'Respond to emails',
      },
      {
        description: 'Organize and prioritize remaining emails',
        time: 0.5,
        mainTaskName: 'Respond to emails',
      },
      {
        description: 'Draft responses to urgent emails',
        time: 0.5,
        mainTaskName: 'Respond to emails',
      },
      {
        description: 'Watch tutorial video on WASP',
        time: 0.5,
        mainTaskName: 'Learn WASP',
      },
      {
        description: 'Complete online quiz on the basics of WASP',
        time: 1.5,
        mainTaskName: 'Learn WASP',
      },
      {
        description: 'Review quiz answers and clarify doubts',
        time: 1,
        mainTaskName: 'Learn WASP',
      },
    ],
  });

  */
  const [isPlanGenerating, setIsPlanGenerating] = useState<boolean>(false);

  const { data: safties, isLoading: isSaftiesLoading } = useQuery(getAllSaftiesByUser);

  const handleSubmit = async () => {
    try {
		// Validate if the input is not empty
		if (!address.trim()) {
			throw(new Error('The address is required.'));
		}
		if (amount < 1 || amount > 100) {
			throw(new Error('Amount between 1-100 USDC.'));
		}

		await handleCreateSaftie({ address, amount });
		setAddress('');
		setAmount(1);
	} catch (err: any) {
		setError((err.message || 'Something went wrong'));
     }
  };

  /*
  const handleGeneratePlan = async () => {
    try {
      setIsPlanGenerating(true);
      const response = await generateGptResponse({
        hours: '8',
      });
      if (response) {
        setResponse(response);
      }
    } catch (err: any) {
      window.alert('Error: ' + (err.message || 'Something went wrong'));
    } finally {
      setIsPlanGenerating(false);
    }
  };
*/

  return (
    <div className='flex flex-col justify-center gap-10'>

	<ol className='mx-auto mt-6 max-w-2xl text-left text-md leading-8 text-gray-600 dark:text-white'>
		<li>1. Don't use decimals. To configure 1 USDC, type "1" as the amount.</li>
		<li>2. Use your wallet address as destination, make sure you have some USDC balance already, since the Saftie won't create the ATA.</li>
		<li>3. Click on the left blue copy icon, to get the shareable link you can place on your X, website, etc.</li>
	</ol>

      <div className='flex flex-col gap-3'>
	  {error &&  <p className='mx-auto mt-6 max-w-2xl text-center text-md leading-8 text-red-600 dark:text-white'>{error}</p>}
	  <div className='flex items-center justify-between gap-3'>

		<input
            type='number'
            id='amount'
            className='min-w-[5rem] text-gray-800/90 text-center font-medium rounded-md border border-gray-200 bg-yellow-50 hover:bg-yellow-100 shadow-md focus:outline-none focus:border-transparent focus:shadow-none duration-200 ease-in-out hover:shadow-none'
			step={1}
			min={1}
			max={100}
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.currentTarget.value))}
          />

          <input
            type='text'
            id='address'
            className='text-sm text-gray-600 w-full rounded-md border border-gray-200 bg-[#f5f0ff] shadow-md focus:outline-none focus:border-transparent focus:shadow-none duration-200 ease-in-out hover:shadow-none'
            placeholder='Enter DESTINATION Solana Wallet'
            value={address}
            onChange={(e) => {
				setAddress(e.currentTarget.value)
			}}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />

          <button
            type='button'
            onClick={handleSubmit}
            className='min-w-[7rem] font-medium text-gray-800/90 bg-yellow-50 shadow-md ring-1 ring-inset ring-slate-200 py-2 px-4 rounded-md hover:bg-yellow-100 duration-200 ease-in-out focus:outline-none focus:shadow-none hover:shadow-none'
          >
            Add Saftie
          </button>
        </div>
      </div>

      <div className='space-y-10 col-span-full'>
        {isSaftiesLoading && <div>Loading...</div>}

        {safties!! && safties.length > 0 ? (
          <div className='space-y-4'>
            {safties.map((saftie: Saftie) => (
              <SaftieList key={saftie.id} id={saftie.id} address={saftie.address} amount={saftie.amount} />
            ))}
          </div>
        ) : (
          <div className='text-gray-600 text-center'>Add Safties to begin</div>
        )}
      </div>

{/*
      <button
        type='button'
        disabled={isPlanGenerating || safties?.length === 0}
        onClick={() => handleGeneratePlan()}
        className='flex items-center justify-center min-w-[7rem] font-medium text-gray-800/90 bg-yellow-50 shadow-md ring-1 ring-inset ring-slate-200 py-2 px-4 rounded-md hover:bg-yellow-100 duration-200 ease-in-out focus:outline-none focus:shadow-none hover:shadow-none disabled:opacity-70 disabled:cursor-not-allowed'
      >
        {isPlanGenerating ? (
          <>
            <CgSpinner className='inline-block mr-2 animate-spin' />
            Generating...
          </>
        ) : (
          'Generate Schedule'
        )}
      </button>

      {!!response && (
        <div className='flex flex-col'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Today's Schedule</h3>

          <TaskTable schedule={response} />
        </div>
      )}
*/}
    </div>
  );
}

type SaftieListProps = Pick<Saftie, 'id' | 'address' | 'amount'>;

function SaftieList({ id, address, amount }: SaftieListProps) {


  const handleDeleteClick = async () => {
    await deleteSaftie({ id });
  };

  const handleCopyClick = async () => {
    // TODO
	alert("Not done");
  };

  return (
    <div className='flex items-center justify-between bg-purple-50 rounded-lg border border-gray-200 p-2 w-full'>
	<div className='flex items-center justify-start w-15'>
        <button className='p-1' onClick={handleCopyClick} title='Copy Saftie Link'>
          <TiClipboard size='20' className='text-blue-600 hover:text-blue-700' />
        </button>
      </div>
      <div className='flex items-center justify-between gap-5 w-full'>
        <div className='flex items-center gap-3'>

          <span
            className='text-slate-600'>
            {address}
          </span>
        </div>
        <div className='flex items-center gap-2'>
		<span
            className='text-slate-600'>
            {amount} usdc
          </span>
        </div>
      </div>
      <div className='flex items-center justify-end w-15'>
        <button className='p-1' onClick={handleDeleteClick} title='Delete Saftie'>
          <TiDelete size='20' className='text-red-600 hover:text-red-700' />
        </button>
      </div>
    </div>
  );
}

/*
function TaskTable({ schedule }: { schedule: GeneratedSchedule }) {
  return (
    <div className='flex flex-col gap-6 py-6'>
      <table className='table-auto w-full border-separate border border-spacing-2 rounded-md border-slate-200 shadow-sm'>
        {!!schedule.mainTasks ? (
          schedule.mainTasks
            .map((mainTask) => <SaftieTable key={mainTask.name} mainTask={mainTask} />)
            .sort((a, b) => {
              const priorityOrder = ['low', 'medium', 'high'];
              if (a.props.mainTask.priority && b.props.mainTask.priority) {
                return (
                  priorityOrder.indexOf(b.props.mainTask.priority) - priorityOrder.indexOf(a.props.mainTask.priority)
                );
              } else {
                return 0;
              }
            })
        ) : (
          <div className='text-slate-600 text-center'>OpenAI didn't return any Main Tasks. Try again.</div>
        )}
      </table>

      
    </div>
  );
}

function SaftieTable({ mainTask }: { mainTask: MainTask; }) {
  return (
    <>
      <thead>
        <tr>
          <th
            className={cn(
              'flex items-center justify-between gap-5 py-4 px-3 text-slate-800 border rounded-md border-slate-200 bg-opacity-70',
              {
                'bg-red-100': mainTask.priority === 'high',
                'bg-green-100': mainTask.priority === 'low',
                'bg-yellow-100': mainTask.priority === 'medium',
              }
            )}
          >
            <span>{mainTask.name}</span>
            <span className='opacity-70 text-xs font-medium italic'> {mainTask.priority} priority</span>
          </th>
        </tr>
      </thead>
	
      {!!subtasks ? (
        subtasks.map((subtask) => {
          if (subtask.mainTaskName === mainTask.name) {
            return (
              <tbody key={subtask.description}>
                <tr>
                  <td
                    className={cn(
                      'flex items-center justify-between gap-4 py-2 px-3 text-slate-600 border rounded-md border-purple-100 bg-opacity-60',
                      {
                        'bg-red-50': mainTask.priority === 'high',
                        'bg-green-50': mainTask.priority === 'low',
                        'bg-yellow-50': mainTask.priority === 'medium',
                      }
                    )}
                  >
                    <SubtaskTable description={subtask.description} time={subtask.time} />
                  </td>
                </tr>
              </tbody>
            );
          }
        })
      ) : (
        <div className='text-slate-600 text-center'>OpenAI didn't return any Subtasks. Try again.</div>
      )}

    </>
  );
}

*/

/*
function SubtaskTable({ description, time }: { description: string; time: number }) {
  const [isDone, setIsDone] = useState<boolean>(false);

  const convertHrsToMinutes = (time: number) => {
    if (time === 0) return 0;
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return `${hours > 0 ? hours + 'hr' : ''} ${minutes > 0 ? minutes + 'min' : ''}`;
  };

  const minutes = useMemo(() => convertHrsToMinutes(time), [time]);

  return (
    <>
      <input
        type='checkbox'
        className='ml-1 form-checkbox bg-purple-500 checked:bg-purple-300 rounded border-purple-600 duration-200 ease-in-out hover:bg-purple-600 hover:checked:bg-purple-600 focus:ring focus:ring-purple-300 focus:checked:bg-purple-400 focus:ring-opacity-50'
        checked={isDone}
        onChange={(e) => setIsDone(e.currentTarget.checked)}
      />
      <span
        className={cn('leading-tight justify-self-start w-full text-slate-600', {
          'line-through text-slate-500 opacity-50': isDone,
        })}
      >
        {description}
      </span>
      <span
        className={cn('text-slate-600 text-right', {
          'line-through text-slate-500 opacity-50': isDone,
        })}
      >
        {minutes}
      </span>
    </>
  );
}
  */
