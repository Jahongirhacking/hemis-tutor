import { RootState } from '@/store/store';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Badge,
    Button,
    Calendar,
    Card,
    Checkbox,
    Flex,
    Input,
    Modal, Tag,
    Typography,
    Upload,
    message
} from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './TodoPage.scss';
import TodoProgress from './components/TodoProgress';

interface TodoItem {
    id: string;
    title: string;
    completed: boolean;
    date: string;
    time?: string;
    description?: string;
    fileUrl?: string;
    fileName?: string;
    notes?: string;
}

const TodoPage = () => {
    // const { t } = useTranslation();
    const themeColor = useSelector((store: RootState) => store?.themeSlice?.color);
    const [todos, setTodos] = useState<TodoItem[]>([
        {
            id: '1',
            title: 'Talabalar bilan uchrashuv',
            completed: true,
            date: dayjs().format('YYYY-MM-DD'),
            time: '09:00',
            description: 'Guruh talabalar bilan muntazam uchrashuv',
        },
        {
            id: '2',
            title: "Guruh yig'ilishi",
            completed: true,
            date: dayjs().format('YYYY-MM-DD'),
            time: '11:00',
            description: "Haftalik guruh yig'ilishi",
        },
        {
            id: '3',
            title: 'Individual maslahatlar',
            completed: false,
            date: dayjs().format('YYYY-MM-DD'),
            time: '14:00',
            description: 'Talabalar bilan individual maslahatlar',
        },
        {
            id: '4',
            title: 'Hisobot tayyorlash',
            completed: false,
            date: dayjs().format('YYYY-MM-DD'),
            time: '16:00',
            description: 'Oylik hisobot tayyorlash',
        },
    ]);
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [selectedTodos, setSelectedTodos] = useState<TodoItem[]>([]);
    const [newTodo, setNewTodo] = useState({
        title: '',
        time: '',
        description: '',
    });

    const getTodosForDate = (date: Dayjs) => {
        return todos.filter(todo => dayjs(todo.date).isSame(date, 'day'));
    };

    const getCompletedCount = () => {
        const todayTodos = getTodosForDate(selectedDate);
        return todayTodos.filter(todo => todo.completed).length;
    };

    const getTotalCount = () => {
        return getTodosForDate(selectedDate).length;
    };

    const dateCellRender = (date: Dayjs) => {
        const dayTodos = getTodosForDate(date);
        if (dayTodos.length === 0) return null;

        const completedCount = dayTodos.filter(todo => todo.completed).length;
        const isAllCompleted = completedCount === dayTodos.length;

        return (
            <div className="calendar-cell">
                <Badge
                    count={dayTodos.length}
                    style={{
                        backgroundColor: isAllCompleted ? '#14b8a6' : '#f59e0b',
                        boxShadow: '0 2px 8px rgba(20, 184, 166, 0.3)',
                    }}
                />
            </div>
        );
    };

    const handleDateSelect = (date: Dayjs) => {
        setSelectedDate(date);
        const dayTodos = getTodosForDate(date);
        if (dayTodos.length > 0) {
            setSelectedTodos(dayTodos);
            setIsModalVisible(true);
        }
    };

    const handleToggleTodo = (todoId: string) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            )
        );
        setSelectedTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleAddTodo = () => {
        if (!newTodo.title.trim()) {
            message.warning('Vazifa nomini kiriting');
            return;
        }

        const newTodoItem: TodoItem = {
            id: Date.now().toString(),
            title: newTodo.title,
            completed: false,
            date: selectedDate.format('YYYY-MM-DD'),
            time: newTodo.time,
            description: newTodo.description,
        };

        setTodos([...todos, newTodoItem]);
        setNewTodo({ title: '', time: '', description: '' });
        setIsAddModalVisible(false);
        message.success('Vazifa qo\'shildi');
    };

    const handleFileUpload = (info: any, todoId: string) => {
        if (info.file.status === 'done') {
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo.id === todoId
                        ? {
                            ...todo,
                            fileUrl: info.file.response?.url || '#',
                            fileName: info.file.name,
                        }
                        : todo
                )
            );
            message.success('Fayl yuklandi');
        }
    };

    const handleNotesChange = (todoId: string, notes: string) => {
        setTodos(prevTodos =>
            prevTodos.map(todo => (todo.id === todoId ? { ...todo, notes } : todo))
        );
    };

    const todayTodos = getTodosForDate(selectedDate);

    return (
        <div className="todo-page upper-element">
            <Flex vertical gap={24}>
                {/* Header */}
                <Card
                    className="todo-header"
                    style={{
                        background:
                            themeColor === 'dark'
                                ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
                                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                        border:
                            themeColor === 'dark'
                                ? '1px solid rgba(20, 184, 166, 0.1)'
                                : '1px solid rgba(20, 184, 166, 0.08)',
                    }}
                >
                    <Flex justify="space-between" align="center" wrap gap={16}>
                        <Flex align="center" gap={12} wrap>
                            <div
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 12,
                                    background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 12px rgba(20, 184, 166, 0.2)',
                                }}
                            >
                                <MapPin size={24} color="white" />
                            </div>
                            <div>
                                <Typography.Title
                                    level={2}
                                    style={{ margin: 0, marginBottom: '4px' }}
                                >
                                    Vazifalar kalendari
                                </Typography.Title>
                                <Typography.Text type="secondary" style={{ fontSize: '14px' }}>
                                    Kunlik vazifalaringizni boshqaring
                                </Typography.Text>
                            </div>
                        </Flex>

                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setIsAddModalVisible(true)}
                            size="large"
                            style={{
                                background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                                border: 'none',
                                boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
                            }}
                        >
                            Vazifa qo'shish
                        </Button>
                    </Flex>
                </Card>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <Card
                        className="stat-card"
                        style={{
                            background:
                                themeColor === 'dark'
                                    ? 'rgba(20, 184, 166, 0.1)'
                                    : 'rgba(20, 184, 166, 0.05)',
                            border:
                                themeColor === 'dark'
                                    ? '1px solid rgba(20, 184, 166, 0.2)'
                                    : '1px solid rgba(20, 184, 166, 0.1)',
                        }}
                    >
                        <Flex vertical gap={8}>
                            <Typography.Text type="secondary">Jami vazifalar</Typography.Text>
                            <Typography.Title level={2} style={{ margin: 0, color: '#14b8a6' }}>
                                {getTotalCount()}
                            </Typography.Title>
                        </Flex>
                    </Card>

                    <Card
                        className="stat-card"
                        style={{
                            background:
                                themeColor === 'dark'
                                    ? 'rgba(34, 197, 94, 0.1)'
                                    : 'rgba(34, 197, 94, 0.05)',
                            border:
                                themeColor === 'dark'
                                    ? '1px solid rgba(34, 197, 94, 0.2)'
                                    : '1px solid rgba(34, 197, 94, 0.1)',
                        }}
                    >
                        <Flex vertical gap={8}>
                            <Typography.Text type="secondary">Bajarilgan</Typography.Text>
                            <Typography.Title level={2} style={{ margin: 0, color: '#22c55e' }}>
                                {getCompletedCount()}
                            </Typography.Title>
                        </Flex>
                    </Card>

                    <Card
                        className="stat-card"
                        style={{
                            background:
                                themeColor === 'dark'
                                    ? 'rgba(245, 158, 11, 0.1)'
                                    : 'rgba(245, 158, 11, 0.05)',
                            border:
                                themeColor === 'dark'
                                    ? '1px solid rgba(245, 158, 11, 0.2)'
                                    : '1px solid rgba(245, 158, 11, 0.1)',
                        }}
                    >
                        <Flex vertical gap={8}>
                            <Typography.Text type="secondary">Tugallanmagan</Typography.Text>
                            <Typography.Title level={2} style={{ margin: 0, color: '#f59e0b' }}>
                                {getTotalCount() - getCompletedCount()}
                            </Typography.Title>
                        </Flex>
                    </Card>
                </div>

                {/* Calendar */}
                <Card
                    className="calendar-card"
                    style={{
                        background:
                            themeColor === 'dark'
                                ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
                                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                        border:
                            themeColor === 'dark'
                                ? '1px solid rgba(20, 184, 166, 0.1)'
                                : '1px solid rgba(20, 184, 166, 0.08)',
                    }}
                >
                    <Calendar
                        cellRender={dateCellRender}
                        onSelect={handleDateSelect}
                        value={selectedDate}
                        className="todo-calendar"
                    />
                </Card>

                <TodoProgress themeColor={themeColor} />

                {/* Today's Tasks */}
                <Card
                    className="tasks-card"
                    title={
                        <Flex align="center" gap={12}>
                            <Typography.Title level={4} style={{ margin: 0 }}>
                                {selectedDate.format('DD MMMM YYYY')} - Vazifalar
                            </Typography.Title>
                            <Tag color={todayTodos.length > 0 ? 'cyan' : 'default'}>
                                {todayTodos.length} ta vazifa
                            </Tag>
                        </Flex>
                    }
                    style={{
                        background:
                            themeColor === 'dark'
                                ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
                                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                        border:
                            themeColor === 'dark'
                                ? '1px solid rgba(20, 184, 166, 0.1)'
                                : '1px solid rgba(20, 184, 166, 0.08)',
                    }}
                >
                    <Flex vertical gap={12}>
                        {todayTodos.length === 0 ? (
                            <Flex
                                justify="center"
                                align="center"
                                style={{ minHeight: '200px' }}
                            >
                                <Typography.Text type="secondary">
                                    Bu sana uchun vazifa yo'q
                                </Typography.Text>
                            </Flex>
                        ) : (
                            todayTodos.map(todo => (
                                <Card
                                    key={todo.id}
                                    className={`task-item ${todo.completed ? 'completed' : ''}`}
                                    style={{
                                        background: todo.completed
                                            ? themeColor === 'dark'
                                                ? 'rgba(20, 184, 166, 0.1)'
                                                : 'rgba(20, 184, 166, 0.05)'
                                            : themeColor === 'dark'
                                                ? 'rgba(255, 255, 255, 0.03)'
                                                : 'rgba(0, 0, 0, 0.02)',
                                        border: todo.completed
                                            ? '1px solid rgba(20, 184, 166, 0.3)'
                                            : '1px solid rgba(148, 163, 184, 0.2)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                    }}
                                    hoverable
                                >
                                    <Flex gap={12} align="start">
                                        <Checkbox
                                            checked={todo.completed}
                                            onChange={() => handleToggleTodo(todo.id)}
                                            style={{ marginTop: '4px' }}
                                        />
                                        <Flex vertical gap={8} style={{ flex: 1 }}>
                                            <Flex justify="space-between" align="center" wrap gap={8}>
                                                <Typography.Text
                                                    strong
                                                    style={{
                                                        fontSize: '16px',
                                                        textDecoration: todo.completed
                                                            ? 'line-through'
                                                            : 'none',
                                                        opacity: todo.completed ? 0.6 : 1,
                                                    }}
                                                >
                                                    {todo.title}
                                                </Typography.Text>
                                                {todo.time && (
                                                    <Tag color="blue" style={{ margin: 0 }}>
                                                        {todo.time}
                                                    </Tag>
                                                )}
                                            </Flex>
                                            {todo.description && (
                                                <Typography.Text
                                                    type="secondary"
                                                    style={{
                                                        fontSize: '14px',
                                                        opacity: todo.completed ? 0.5 : 0.7,
                                                    }}
                                                >
                                                    {todo.description}
                                                </Typography.Text>
                                            )}
                                        </Flex>
                                    </Flex>
                                </Card>
                            ))
                        )}
                    </Flex>
                </Card>
            </Flex>

            {/* Date Details Modal */}
            <Modal
                title={
                    <Flex align="center" gap={12}>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                            {selectedDate.format('DD MMMM YYYY')}
                        </Typography.Title>
                        <Tag color="cyan">{selectedTodos.length} ta vazifa</Tag>
                    </Flex>
                }
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={700}
                className="todo-modal"
            >
                <Flex vertical gap={16}>
                    {selectedTodos.map(todo => (
                        <Card
                            key={todo.id}
                            className={`task-detail-card ${todo.completed ? 'completed' : ''}`}
                            style={{
                                background: todo.completed
                                    ? 'rgba(20, 184, 166, 0.05)'
                                    : 'rgba(0, 0, 0, 0.02)',
                                border: todo.completed
                                    ? '1px solid rgba(20, 184, 166, 0.3)'
                                    : '1px solid rgba(148, 163, 184, 0.2)',
                            }}
                        >
                            <Flex vertical gap={16}>
                                <Flex gap={12} align="start">
                                    <Checkbox
                                        checked={todo.completed}
                                        onChange={() => handleToggleTodo(todo.id)}
                                        style={{ marginTop: '4px' }}
                                    />
                                    <Flex vertical gap={8} style={{ flex: 1 }}>
                                        <Flex justify="space-between" align="center" wrap gap={8}>
                                            <Typography.Text
                                                strong
                                                style={{
                                                    fontSize: '18px',
                                                    textDecoration: todo.completed
                                                        ? 'line-through'
                                                        : 'none',
                                                }}
                                            >
                                                {todo.title}
                                            </Typography.Text>
                                            {todo.time && <Tag color="blue">{todo.time}</Tag>}
                                        </Flex>
                                        {todo.description && (
                                            <Typography.Text type="secondary">
                                                {todo.description}
                                            </Typography.Text>
                                        )}
                                    </Flex>
                                </Flex>

                                {!todo.completed && (
                                    <Flex vertical gap={12}>
                                        <Typography.Text strong>
                                            Vazifani bajarish uchun:
                                        </Typography.Text>

                                        <Flex gap={8} wrap>
                                            <Upload
                                                accept="*/*"
                                                showUploadList={false}
                                                customRequest={({ onSuccess }) => {
                                                    setTimeout(() => {
                                                        onSuccess({ url: '#' });
                                                    }, 1000);
                                                }}
                                                onChange={info => handleFileUpload(info, todo.id)}
                                            >
                                                <Button icon={<UploadOutlined />}>
                                                    Fayl yuklash (ixtiyoriy)
                                                </Button>
                                            </Upload>
                                            {todo.fileName && (
                                                <Tag color="green" closable>
                                                    {todo.fileName}
                                                </Tag>
                                            )}
                                        </Flex>

                                        <Input.TextArea
                                            placeholder="Izoh yozing (ixtiyoriy)"
                                            rows={3}
                                            value={todo.notes}
                                            onChange={e => handleNotesChange(todo.id, e.target.value)}
                                        />
                                    </Flex>
                                )}

                                {todo.completed && (
                                    <Flex
                                        align="center"
                                        gap={8}
                                        style={{
                                            padding: '12px',
                                            background: 'rgba(34, 197, 94, 0.1)',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <Typography.Text style={{ color: '#22c55e' }}>
                                            ✓ Vazifa bajarildi
                                        </Typography.Text>
                                    </Flex>
                                )}
                            </Flex>
                        </Card>
                    ))}
                </Flex>
            </Modal>

            {/* Add Todo Modal */}
            <Modal
                title="Yangi vazifa qo'shish"
                open={isAddModalVisible}
                onCancel={() => {
                    setIsAddModalVisible(false);
                    setNewTodo({ title: '', time: '', description: '' });
                }}
                onOk={handleAddTodo}
                okText="Qo'shish"
                cancelText="Bekor qilish"
                className="add-todo-modal"
            >
                <Flex vertical gap={16}>
                    <Flex vertical gap={8}>
                        <Typography.Text strong>Vazifa nomi *</Typography.Text>
                        <Input
                            placeholder="Vazifa nomini kiriting"
                            value={newTodo.title}
                            onChange={e =>
                                setNewTodo({ ...newTodo, title: e.target.value })
                            }
                        />
                    </Flex>

                    <Flex vertical gap={8}>
                        <Typography.Text strong>Vaqt (ixtiyoriy)</Typography.Text>
                        <Input
                            placeholder="Masalan: 14:00"
                            value={newTodo.time}
                            onChange={e => setNewTodo({ ...newTodo, time: e.target.value })}
                        />
                    </Flex>

                    <Flex vertical gap={8}>
                        <Typography.Text strong>Tavsif (ixtiyoriy)</Typography.Text>
                        <Input.TextArea
                            placeholder="Vazifa haqida qisqacha ma'lumot"
                            rows={4}
                            value={newTodo.description}
                            onChange={e =>
                                setNewTodo({ ...newTodo, description: e.target.value })
                            }
                        />
                    </Flex>

                    <Flex vertical gap={8}>
                        <Typography.Text strong>Sana</Typography.Text>
                        <Typography.Text type="secondary">
                            {selectedDate.format('DD MMMM YYYY')}
                        </Typography.Text>
                    </Flex>
                </Flex>
            </Modal>
        </div>
    );
};

export default TodoPage;