<div class="container h-full mx-auto gap-8 flex flex-col p-4">
	<form method="POST" class="card p-4 flex flex-col gap-3" use:enhance data-testid="login-form">
		<h1>Login</h1>
		<label class="emailLabel">
			<span>Email</span>
			<input class="input p-4" type="text" placeholder="Email address" data-testid="email" />
		</label>

		<label class="passwordLabel">
			<span>Password</span>
			<input class="input p-4" type="password" placeholder="password" data-testid="password" />
		</label>

		<button type="button" class="btn variant-ghost-primary self-end">Login</button>
	</form>
</div>
