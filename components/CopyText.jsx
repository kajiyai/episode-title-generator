import { useClipboard } from '@chakra-ui/react'
function CopyText() {
    const placeholder = "text to be copied...";
    const { onCopy, value, setValue, hasCopied } = useClipboard("");

    return (
        <>
            <Flex mb={2}>
                <Button onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}</Button>
            </Flex>
            <Editable placeholder="Paste here">
                <EditablePreview width="100%" />
                <EditableInput />
            </Editable>
        </>
    )
}