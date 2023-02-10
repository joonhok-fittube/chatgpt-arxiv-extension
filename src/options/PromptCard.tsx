import { Button, Card, Divider, Grid, Text, Textarea, useToasts } from '@geist-ui/core'
import Trash2 from '@geist-ui/icons/trash2'
import { useCallback, useState } from 'preact/hooks'

function PromptCard(props: {
  header: string
  prompt: string
  onSave: (newPrompt: string) => Promise<void>
  onDismiss?: () => void
}) {
  const { header, prompt, onSave, onDismiss } = props
  const [value, setValue] = useState<string>(prompt)
  const { setToast } = useToasts()

  const onPromptChange = useCallback(
    (prompt: string) => {
      setValue(prompt)
      onSave(prompt)
      setToast({ text: 'Prompt changes saved', type: 'success' })
    },
    [onSave, setToast],
  )

  return (
    <Card width="100%">
      <Card.Content>
        <Grid.Container gap={2} justify="center">
          <Grid xs>
            <Text b my={0}>
              {header}
            </Text>
          </Grid>
          {onDismiss && (
            <Grid xs={2} justify="center" alignItems="center">
              <Trash2 size={18} onClick={() => onDismiss()} />
            </Grid>
          )}
        </Grid.Container>
      </Card.Content>

      <Divider h="1px" my={0} />

      <Card.Content>
        <Textarea
          value={value}
          width="100%"
          height="10em"
          onChange={(event) => setValue(event.target.value)}
        >
          {value}
        </Textarea>
      </Card.Content>
      <Card.Footer>
        <Button onClick={() => onPromptChange(value)} className="mt-3">
          Save Prompt
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default PromptCard
