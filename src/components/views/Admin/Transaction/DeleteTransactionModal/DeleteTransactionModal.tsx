import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteCategoryModal from "./useDeleteTransactionModal";
import useDeleteTransactionModal from "./useDeleteTransactionModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  refetchTransactions: () => void;
}

const DeleteTransactionModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    selectedId,
    setSelectedId,
    refetchTransactions,
  } = props;

  const {
    mutateDeleteTransaction,
    isPendingMutateDeleteTransaction,
    isSuccessMutateDeleteTransaction,
  } = useDeleteTransactionModal();

  useEffect(() => {
    if (isSuccessMutateDeleteTransaction) {
      onClose();
      refetchTransactions();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteTransaction]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Trasaction</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this transaction?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteTransaction}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteTransaction}
            onPress={() => {
              mutateDeleteTransaction(selectedId);
            }}
          >
            {isPendingMutateDeleteTransaction ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Transaction"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTransactionModal;
