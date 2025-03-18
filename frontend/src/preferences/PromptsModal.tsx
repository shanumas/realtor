import { ActiveState } from '../models/misc';
import Input from '../components/Input';
import React from 'react';
import { useTranslation } from 'react-i18next';
import WrapperModal from '../modals/WrapperModal';

function AddPrompt({
  setModalState,
  handleAddPrompt,
  newPromptName,
  setNewPromptName,
  newPromptContent,
  setNewPromptContent,
  disableSave,
}: {
  setModalState: (state: ActiveState) => void;
  handleAddPrompt?: () => void;
  newPromptName: string;
  setNewPromptName: (name: string) => void;
  newPromptContent: string;
  setNewPromptContent: (content: string) => void;
  disableSave: boolean;
}) {
  const { t } = useTranslation();

  return (
    <div>
      <p className="mb-1 text-xl text-jet dark:text-bright-gray">
        {t('modals.prompts.addPrompt')}
      </p>
      <p className="mb-7 text-xs text-[#747474] dark:text-[#7F7F82]">
        {t('modals.prompts.addDescription')}
      </p>
      <div>
        <Input
          placeholder={t('modals.prompts.promptName')}
          type="text"
          className="mb-4"
          value={newPromptName}
          onChange={(e) => setNewPromptName(e.target.value)}
          labelBgClassName="bg-white dark:bg-[#26272E]"
          borderVariant="thin"
        />
        <div className="relative top-[7px] left-3">
          <span className="bg-white px-1 text-xs text-silver dark:bg-[#26272E] dark:text-silver">
            {t('modals.prompts.promptText')}
          </span>
        </div>
        <label htmlFor="new-prompt-content" className="sr-only">
          {t('modals.prompts.promptText')}
        </label>
        <textarea
          id="new-prompt-content"
          className="h-56 w-full rounded-lg border-2 border-silver px-3 py-2 outline-none dark:border-silver/40 dark:bg-transparent dark:text-white"
          value={newPromptContent}
          onChange={(e) => setNewPromptContent(e.target.value)}
          aria-label="Prompt Text"
        ></textarea>
      </div>
      <div className="mt-6 flex flex-row-reverse">
        <button
          onClick={handleAddPrompt}
          className="rounded-3xl bg-purple-30 px-5 py-2 text-sm text-white transition-all hover:bg-violets-are-blue disabled:hover:bg-purple-30"
          disabled={disableSave}
          title={
            disableSave && newPromptName ? t('modals.prompts.nameExists') : ''
          }
        >
          {t('modals.prompts.save')}
        </button>
      </div>
    </div>
  );
}

function EditPrompt({
  setModalState,
  handleEditPrompt,
  editPromptName,
  setEditPromptName,
  editPromptContent,
  setEditPromptContent,
  currentPromptEdit,
  disableSave,
}: {
  setModalState: (state: ActiveState) => void;
  handleEditPrompt?: (id: string, type: string) => void;
  editPromptName: string;
  setEditPromptName: (name: string) => void;
  editPromptContent: string;
  setEditPromptContent: (content: string) => void;
  currentPromptEdit: { name: string; id: string; type: string };
  disableSave: boolean;
}) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="">
        <p className="mb-1 text-xl text-jet dark:text-bright-gray">
          {t('modals.prompts.editPrompt')}
        </p>
        <p className="mb-7 text-xs text-[#747474] dark:text-[#7F7F82]">
          {t('modals.prompts.editDescription')}
        </p>
        <div>
          <Input
            placeholder={t('modals.prompts.promptName')}
            type="text"
            className="mb-4"
            value={editPromptName}
            onChange={(e) => setEditPromptName(e.target.value)}
            labelBgClassName="bg-white dark:bg-charleston-green-2"
            borderVariant="thin"
          />
          <div className="relative top-[7px] left-3">
            <span className="bg-white px-1 text-xs text-silver dark:bg-charleston-green-2 dark:text-silver">
              {t('modals.prompts.promptText')}
            </span>
          </div>
          <label htmlFor="edit-prompt-content" className="sr-only">
            {t('modals.prompts.promptText')}
          </label>
          <textarea
            id="edit-prompt-content"
            className="h-56 w-full rounded-lg border-2 border-silver px-3 py-2 outline-none dark:border-silver/40 dark:bg-transparent dark:text-white"
            value={editPromptContent}
            onChange={(e) => setEditPromptContent(e.target.value)}
            aria-label="Prompt Text"
          ></textarea>
        </div>
        <div className="mt-6 flex flex-row-reverse gap-4">
          <button
            className={`rounded-3xl bg-purple-30 disabled:hover:bg-purple-30  hover:bg-violets-are-blue px-5 py-2 text-sm text-white transition-all ${
              currentPromptEdit.type === 'public'
                ? 'cursor-not-allowed opacity-50'
                : ''
            }`}
            onClick={() => {
              handleEditPrompt &&
                handleEditPrompt(currentPromptEdit.id, currentPromptEdit.type);
            }}
            disabled={currentPromptEdit.type === 'public' || disableSave}
            title={
              disableSave && editPromptName
                ? t('modals.prompts.nameExists')
                : ''
            }
          >
            {t('modals.prompts.save')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PromptsModal({
  existingPrompts,
  modalState,
  setModalState,
  type,
  newPromptName,
  setNewPromptName,
  newPromptContent,
  setNewPromptContent,
  editPromptName,
  setEditPromptName,
  editPromptContent,
  setEditPromptContent,
  currentPromptEdit,
  handleAddPrompt,
  handleEditPrompt,
}: {
  existingPrompts: { name: string; id: string; type: string }[];
  modalState: ActiveState;
  setModalState: (state: ActiveState) => void;
  type: 'ADD' | 'EDIT';
  newPromptName: string;
  setNewPromptName: (name: string) => void;
  newPromptContent: string;
  setNewPromptContent: (content: string) => void;
  editPromptName: string;
  setEditPromptName: (name: string) => void;
  editPromptContent: string;
  setEditPromptContent: (content: string) => void;
  currentPromptEdit: { name: string; id: string; type: string };
  handleAddPrompt?: () => void;
  handleEditPrompt?: (id: string, type: string) => void;
}) {
  const [disableSave, setDisableSave] = React.useState(true);
  const handlePrompNameChange = (edit: boolean, newName: string) => {
    const nameExists = existingPrompts.find(
      (prompt) => newName === prompt.name,
    );

    if (newName && !nameExists) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }

    if (edit) {
      setEditPromptName(newName);
    } else {
      setNewPromptName(newName);
    }
  };

  let view;

  if (type === 'ADD') {
    view = (
      <AddPrompt
        setModalState={setModalState}
        handleAddPrompt={handleAddPrompt}
        newPromptName={newPromptName}
        setNewPromptName={handlePrompNameChange.bind(null, false)}
        newPromptContent={newPromptContent}
        setNewPromptContent={setNewPromptContent}
        disableSave={disableSave}
      />
    );
  } else if (type === 'EDIT') {
    view = (
      <EditPrompt
        setModalState={setModalState}
        handleEditPrompt={handleEditPrompt}
        editPromptName={editPromptName}
        setEditPromptName={handlePrompNameChange.bind(null, true)}
        editPromptContent={editPromptContent}
        setEditPromptContent={setEditPromptContent}
        currentPromptEdit={currentPromptEdit}
        disableSave={disableSave}
      />
    );
  } else {
    view = <></>;
  }

  return modalState === 'ACTIVE' ? (
    <WrapperModal
      close={() => {
        setModalState('INACTIVE');
        if (type === 'ADD') {
          setNewPromptName('');
          setNewPromptContent('');
        }
      }}
      className="sm:w-[512px] mt-24"
    >
      {view}
    </WrapperModal>
  ) : null;
}
