<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    /**
     * Display a listing of services.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $language = $request->input('language', 'en');
        $perPage = $request->input('per_page', 15);

        $services = Service::language($language)
            ->ordered()
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $services
        ]);
    }

    /**
     * Store a newly created service.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'language' => 'required|in:en,ar',
            'title' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $service = Service::create([
                'language' => $request->language,
                'title' => $request->title,
                'slug' => Str::slug($request->title),
                'icon' => $request->icon,
                'description' => $request->description,
                'features' => $request->features,
                'order' => $request->order ?? 0,
                'is_active' => $request->is_active ?? true,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Service created successfully',
                'data' => $service
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create service',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Display the specified service.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $service
        ]);
    }

    /**
     * Update the specified service.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'language' => 'sometimes|in:en,ar',
            'title' => 'sometimes|string|max:255',
            'icon' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $updateData = $request->only([
                'language', 'title', 'icon', 'description', 
                'features', 'order', 'is_active'
            ]);

            if (isset($updateData['title'])) {
                $updateData['slug'] = Str::slug($updateData['title']);
            }

            $service->update($updateData);

            return response()->json([
                'success' => true,
                'message' => 'Service updated successfully',
                'data' => $service->fresh()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update service',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Remove the specified service.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ], 404);
        }

        try {
            $service->delete();

            return response()->json([
                'success' => true,
                'message' => 'Service deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete service',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Toggle service active status.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggle($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ], 404);
        }

        try {
            $service->update(['is_active' => !$service->is_active]);

            return response()->json([
                'success' => true,
                'message' => 'Service status updated successfully',
                'data' => $service->fresh()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to toggle service status',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}
