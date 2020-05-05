export interface Task {
    id: number
    title: string
    done: boolean
}
export interface TaskInputProps {
    onAdd: (title: string) => void
}
export interface TaskInputState {
    title: string
}
