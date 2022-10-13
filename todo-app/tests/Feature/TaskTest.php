<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function setup(): void
    {
        parent::setUp();
        $user = User::factory()->create();
        /** @var \Illuminate\Contracts\Auth\Authenticatable $user */
        $this->actingAs($user);
    }

    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_get_tasks_api()
    {
        $tasks = Task::factory()->count(20)->create();
        $response = $this->getJson('api/tasks');
        $response->assertJsonCount($tasks->where('user_id', 1)->count());
    }

    public function test_post_tasks_api()
    {
        $data = ['title' => 'テスト投稿', 'user_id' => 1];
        $response = $this->postJson('api/tasks', $data);

        $response
            ->assertCreated()
            ->assertJsonFragment($data);
    }

    public function test_update_tasks_api()
    {
        $task = Task::factory()->create(['user_id' => 1]);
        $task->title = '編集';
        $response = $this->patchJson("api/tasks/{$task->id}", $task->toArray());

        $response
            ->assertOk()
            ->assertJsonFragment($task->toArray());
    }

    public function test_updateDone_tasks_api()
    {
        $task = Task::factory()->create(['user_id' => 1]);
        $reverse = !$task->is_done;
        $task->is_done = $reverse;
        $response = $this->patchJson("api/tasks/update-done/{$task->id}", $task->toArray());

        $response
            ->assertOk()
            ->assertJsonFragment($task->toArray());
    }

    public function test_delete_tasks_api()
    {
        $task = Task::factory()->count(10)->create(['user_id' => 1]);
        $response = $this->deleteJson('api/tasks/1');
        $response->assertOk();
        $response = $this->getJson('api/tasks');
        $response->assertJsonCount($task->count() - 1);
    }

    public function test_reject_null_title_tasks_api()
    {
        $data = ['title' => ""];
        $response = $this->postJson('api/tasks', $data);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'title' => 'タイトルは、必ず指定してください'
            ]);
    }

    public function test_reject_over_255_title_tasks_api()
    {
        $data = [
            'title' => str_repeat('a', 256)
        ];
        $response = $this->postJson('api/tasks', $data);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'title' => 'タイトルは、255文字以下にしてください。'
            ]);
    }
}
