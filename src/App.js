import { useRef, useState } from "react";
import TaskList from "./TaskList";
import NewTask from "./NewTask";
import Edit from "./Edit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    Box,
    Button,
    AppBar,
    Toolbar,
    Typography,
    Container,
    Divider
} from "@mui/material";

import {
    pink
} from "@mui/material/colors";

export default function App() {
    const input = useRef();
    const [items, setItems] = useState([
        { id: 1, subject: 'egg', done: false },
        { id: 2, subject: 'potato', done: true },
        { id: 3, subject: 'tomato', done: false },
    ]);

    const add = (subject) => {
        setItems([
            {
                id: items.length + 1,
                subject,
                done: false,
            }, ...items,
        ]);
    };

    const remove = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const toggle = id => {
        const result = items.map(item => {
            if (item.id === id) item.done = !item.done;
            return item;
        });
        setItems(result);
    };

    const clear = () => {
        setItems(items.filter((item) => !item.done));
    };

    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ bgcolor: pink[500] }}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Todo App
                        </Typography>
                        <Button color="inherit" onClick={clear}>Clear</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Router>
                <Routes>
                    <Route path="/"
                    element={
<Container maxWidth="sm" sx={{ mt: 4 }}>
                <NewTask add={add} />

                <TaskList items={items.filter((item) => !item.done)}
                    remove={remove}
                    toggle={toggle}
                />
                <Divider />
                <TaskList items={items.filter((item) => item.done)}
                    remove={remove}
                    toggle={toggle}

                />
            </Container>
                    }
                    />

                    

                    <Route path="/edit/:id" element={<Edit />} />

                </Routes>
            </Router>
            
        </Box>
    );
}