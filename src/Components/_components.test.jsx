// tests for components

import { render, screen } from './_testUtils.jsx'
import { expect, test } from "vitest";
import '@testing-library/jest-dom/vitest';

import Home from './Home.jsx';
import NavBar from './NavBar.jsx';
import NotFound from './NotFound.jsx';
import PlayersList from './PlayersList.jsx';
import TeamsList from './TeamsList.jsx';
import StaffList from './StaffList.jsx';
import Team from './Team.jsx';
import Player from './Player.jsx';
import LoginForm from './LoginForm.jsx';
import AddForm from './AddForm.jsx';
import EditForm from './EditForm.jsx';
import PasswordForm from './PasswordForm.jsx';
import Delete from './Delete.jsx';
import AddAssociationForm from './AddAssociationForm.jsx';


test('renders Home', () => {
    render(<Home />);
    expect(screen.getByText('OGL')).toBeInTheDocument();
})
test('renders Nav', () => {
    render(<NavBar />);
    expect(screen.getByText('Staff')).toBeInTheDocument();
    expect(screen.getByText('Players')).toBeInTheDocument();
    expect(screen.getByText('Teams')).toBeInTheDocument();
})
test('renders 404', () => {
    render(<NotFound />);
    expect(screen.getByText('?')).toBeInTheDocument();
})
test('renders Player list', () => {
    render(<PlayersList />);
    expect(screen.getByText('All Players')).toBeInTheDocument();
})
test('renders Team list', () => {
    render(<TeamsList />);
    expect(screen.getByText('Teams')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
})
test('renders Staff list', () => {
    render(<StaffList />);
    expect(screen.getByText('OGL Staff')).toBeInTheDocument();
})
test('renders Team info', () => {
    render(<Team />);
    expect(screen.getByText('formed', { exact: false })).toBeInTheDocument();
})
test('renders Player info', () => {
    render(<Player />);
    expect(screen.getByText('Main Role')).toBeInTheDocument();
})
test('renders Login form', () => {
    render(<LoginForm />);
    expect(screen.getByText('Log In')).toBeInTheDocument();
})
test('renders Add form', () => {
    render(<AddForm />);
    expect(screen.getByText('Add :')).toBeInTheDocument();
})
test('renders Edit form', () => {
    render(<EditForm />);
    expect(screen.getByText('Edit :')).toBeInTheDocument();
})
test('renders Password form', () => {
    render(<PasswordForm />);
    expect(screen.getByText('Update Password')).toBeInTheDocument();
})
test('renders Delete confirmation', () => {
    render(<Delete />);
    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
})
test('renders Home', () => {
    render(<AddAssociationForm />);
    expect(screen.getByText('Player can only be added to an active team.')).toBeInTheDocument();
})
